package com.enterprise.api.financiatrackr.event.listener;

import java.net.URI;

import org.springframework.context.ApplicationListener;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.enterprise.api.financiatrackr.event.CreatedResourceEvent;

import jakarta.servlet.http.HttpServletResponse;

public class CreatedResourceListener implements ApplicationListener<CreatedResourceEvent> {

    @Override
    public void onApplicationEvent(CreatedResourceEvent event) {
        HttpServletResponse response = event.getResponse();
        Long id = event.getId();

        addHeaderLocation(response, id);
    }

    private void addHeaderLocation(HttpServletResponse response, Long id) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}")
				.buildAndExpand(id).toUri();
		response.setHeader("Location", uri.toASCIIString());
    }
    
}
