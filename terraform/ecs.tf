resource "aws_ecs_cluster" "main" {
  name = "${var.name}-cluster-${var.env}"
}

resource "aws_ecs_task_definition" "webapp" {
  family                   = "gromits-webapp"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name      = "${var.name}-webapp-container-${var.env}"
    image     = "${var.container_registry}/${var.webapp_image}:${var.webapp_image_tag}"
    essential = true
    portMappings = [{
      protocol      = "tcp"
      containerPort = var.webapp_port
      hostPort      = var.webapp_port
    }]
  }])
}

resource "aws_ecs_service" "webapp" {
  name                               = "${var.name}-${var.env}-webapp"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.webapp.arn
  desired_count                      = var.webapp_count
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    subnets          = aws_subnet.public.*.id
    security_groups  = [aws_security_group.allow_http.id]
    assign_public_ip = true
  }
}

resource "aws_ecs_task_definition" "poi_service" {
  family                   = "${var.name}-${var.env}-poi_service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name      = "${var.name}-poi_service-container-${var.env}"
    image     = "${var.container_registry}/${var.poi_service_image}:${var.poi_service_image_tag}"
    essential = true
    portMappings = [{
      protocol      = "tcp"
      containerPort = var.poi_service_port
      hostPort      = var.poi_service_port
    }]
    environment : [
      {
        name: "DB_URL",
        value: "TODO"
      },
      {
        name: "DB_USER",
        value: "TODO"
      }
    ]
    secrets : [
      {
        name: "DB_PASSWORD",
        valueFrom: aws_secretsmanager_secret.poi_db_password.arn
      }
    ] 
  }])
}

resource "aws_ecs_service" "poi_service" {
  name                               = "${var.name}-${var.env}-service"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.webapp.arn
  desired_count                      = var.poi_service_count
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    subnets          = aws_subnet.public.*.id
    security_groups  = [aws_security_group.allow_http.id]
    assign_public_ip = true
  }
}