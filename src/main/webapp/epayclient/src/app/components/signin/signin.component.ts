import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {User} from "@app/entities/user";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {MapsAPILoader, MouseEvent} from "@agm/core";
import {UserService} from "@app/services/user.service";
import {AuthenticationService} from "@app/services/authentication.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  // inputUser?: User;

  // latitude: number = 0;
  // longitude: number = 0;
  zoom: number = 12;
  // address?: string;
  private geoCoder: any;

  userForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    password: [],
    is_active: [],
    start_date: [],
    end_date: [],
    latitude: [],
    longitude: [],
    address: []
  });


  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private userService: UserService,
    private apiloader: MapsAPILoader,
    private authenticationService: AuthenticationService,
    private ngZone: NgZone
  ) {
  }

  @ViewChild('search')
  public searchElementRef!: ElementRef;


  ngOnInit(): void {
    //load Places Autocomplete
    this.apiloader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude, address and zoom
          this.userForm.get('latitude')!.setValue(place.geometry.location.lat());
          this.userForm.get('longitude')!.setValue(place.geometry.location.lng());
          this.userForm.get('address')!.setValue(place.formatted_address);
          this.zoom = 12;
        });
      });
    });
  }

  close(): void {
    this.activeModal.close(false);
  }

  save(): void {
    const user = this.createFromForm();
    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.updateUser(user));
    } else {
      this.subscribeToSaveResponse(this.userService.addUser(user));
    }
  }

  private createFromForm(): User {
    const start_date = this.userForm.get('start_date')!.value;
    const end_date = this.userForm.get('end_date')!.value;
    const user = new User();
    // user.id = this.userForm.get('id')!.value;
    user.name = this.userForm.get('name')!.value;
    user.email = this.userForm.get('email')!.value;
    user.password = this.userForm.get('password')!.value;
    user.is_active = this.userForm.get('is_active')!.value;
    user.start_date = new Date(start_date.year, start_date.month - 1, start_date.day);
    user.end_date = new Date(end_date.year, end_date.month - 1, end_date.day);
    user.latitude = this.userForm.get('latitude')!.value;
    user.longitude = this.userForm.get('longitude')!.value;
    user.address = this.userForm.get('address')!.value;
    return user;
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<User>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('You have been registered! Check your email', 'Success!');
      this.goToUrl();
    } else {
      this.toastr.success('You have been registered! Check your email!', 'Success!');
      this.goToUrl();
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Email may have been taken! Try another!', 'Error!');
    } else {
      debugger
      this.toastr.error('Email may have been taken! Try another2!', 'Error!');
    }
  }

  mapClicked($event: MouseEvent) {
    if (ModalTypesEnum.VIEW === this.modalType) {
      return;
    }
    this.userForm.get('latitude')!.setValue($event.coords.lat);
    this.userForm.get('longitude')!.setValue($event.coords.lng);
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
    });
    const that = this;
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: this.userForm.get('latitude')!.value,
        lng: this.userForm.get('longitude')!.value,
      };
      geocoder.geocode({
        'location': latlng
      }, function (results, status) {
        if (results[0]) {
          that.userForm.get('address')!.setValue(results[0].formatted_address);
        } else {
          console.log('Not found');
        }
      });
    });
  }

  markerDragEnd($event: MouseEvent) {
    this.userForm.get('latitude')!.setValue($event.coords.lat);
    this.userForm.get('longitude')!.setValue($event.coords.lng);
    // this.getAddress(this.latitude, this.longitude);
    const that = this;
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: this.userForm.get('latitude')!.value,
        lng: this.userForm.get('longitude')!.value,
      };
      geocoder.geocode({
        'location': latlng
      }, function (results, status) {
        if (results[0]) {
          that.userForm.get('address')!.setValue(results[0].formatted_address);
        } else {
        }
      });
    });
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({
      'location': {
        lat: latitude,
        lng: longitude
      }
    }, (results: { formatted_address: string | undefined; }[], status: string) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.userForm.get('address')!.setValue(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  markers: marker[] = [];

  goToUrl() {
    this.authenticationService.showLogin();
  }
}

interface marker {
  lat?: number;
  lng?: number;
  label?: string;
}
