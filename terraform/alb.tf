resource "aws_lb" "staging" {
    name = "alb"
    subnets = data.aws_subnet_ids.default.ids
    load_balancer_type = "application"
    security_groups = [aws_security_group.lb.id]

    tags = {
        Environment = "staging"
        Application = "dummyapi"
    }
}

resource "aws_lb_listener" "front_end" {
    load_balancer_arn = aws_lb.staging.arn
    port = 80
    protocol = "HTTP"

    default action {
        type = "forward"
        target_group_arm = aws_lb_target_group.staging.arn
    }
}

resource "aws_lb_target_group" "webapp" {
    name = "gromits-webapp-alb-tg"
    port = 80
    protocol = "HTTP"
    vpc_id = data.aws_vpc.default.id
    target_type = "ip"

    health_check {
        healthy_threshold = "3"
        interval = "90"
        protocol = "HTTP"
        matcher = "200-299"
        timeout = "20"
        path = "/"
        unhealthy_threshold = "2"
    }
}