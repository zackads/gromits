resource "aws_security_group" "lb" {
    name = "lb-sg"
    description = "Controls access to the Application Load Balancer"

    # Allow all TCP traffic on port 80 to ingress
    ingress {
        protocol = "tcp"
        from_port = 80
        to_port = 80
        cidr_blocks = ["0.0.0.0/0"]
    }

    # Allow all traffic to egress
    egress {
        protocol = "-1"
        from_port = 0
        to_port = 0
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "ecs_tasks" {
    name = "ecs-tasks-sg"
    description = "Allow inbound access to ECS Tasks from ALB only"

    ingress {
        protocol = "tcp"
        from_port = 4000
        to_port = 4000
        cidr_blocks = ["0.0.0.0/0"]
        security_groups = [aws_security_group.lb.id]
    }

    egress {
        protocol = "-1"
        from_port = 0
        to_port = 0
        cidr_blocks = ["0.0.0.0/0"]
    }
}