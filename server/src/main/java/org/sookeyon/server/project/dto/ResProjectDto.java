package org.sookeyon.server.project.dto;


import java.time.LocalDate;
import java.util.Map;

public class ResProjectDto {
    private long id;

    private LocalDate date;

    private String title;

    private String summary;

    private String company;

    private String category;

    private String role;

    private String period;

    private String[] stack;

    private String imageUrl;

    private int hue;

    private String problem;

    private String process;

    private String result;

    private Map<String, String> links;
}

