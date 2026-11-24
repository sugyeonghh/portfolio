package org.sookeyon.server.project.controller;


import lombok.RequiredArgsConstructor;
import org.sookeyon.server.project.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    // post

    // delete


    // update


    // get
    @GetMapping("/{project-id}")
    public void getProject() {

    }

    // get list
    @GetMapping()
    public void getProjects() {
        service.findProjects();
    }

}
