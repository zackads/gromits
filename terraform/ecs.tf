data "aws_ecr_repository" "webapp" {
  name = var.webapp_image
}

resource "aws_ecs_cluster" "main" {
  name = "${var.env}-gromits-cluster"
}

resource "aws_ecs_task_definition" "webapp" {
  family                   = "${var.env}-gromits-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.webapp_fargate_cpu
  memory                   = var.webapp_fargate_memory
  container_definitions = jsonencode([{
    name : "gromits-webapp",
    image : "${data.aws_ecr_repository.webapp.repository_url}:${var.webapp_image_tag}",
    portMappings : [
      {
        containerPort : var.webapp_port
        hostPort : var.webapp_port
      }
    ],
    logConfiguration : {
      "logDriver" : "awslogs",
      "options" : {
        "awslogs-group" : aws_cloudwatch_log_group.log_group.name,
        "awslogs-region" : var.aws_region,
        "awslogs-stream-prefix" : "webapp"
      }
    }
  }])
}

resource "aws_ecs_service" "webapp" {
  name             = "${var.env}-beacons-webapp"
  cluster          = aws_ecs_cluster.main.id
  task_definition  = aws_ecs_task_definition.webapp.arn
  desired_count    = var.webapp_count
  launch_type      = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_tasks.id]
    subnets         = data.aws_subnet_ids.default.ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.webapp.id
    container_name   = "gromits-webapp"
    container_port   = var.webapp_port
  }

  depends_on = [aws_alb_listener.front_end, aws_iam_role_policy_attachment.ecs_task_execution_role]
}
