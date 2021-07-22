package com.internship.epayment.util;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

public class PaginationUtil {
    public static final String HEADER_X_TOTAL_COUNT = "X-Total-Count";

    public static <T> HttpHeaders generatePaginationHttpHeaders(Page<T> page) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HEADER_X_TOTAL_COUNT, Long.toString(page.getTotalElements()));
        return headers;
    }
}
