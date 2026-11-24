package org.sookeyon.server.project.repository;

import org.sookeyon.server.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
