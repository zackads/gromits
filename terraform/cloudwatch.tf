resource "aws_cloudwatch_log_group" "log_group" {
    name = "awslogs-gromits-staging"

    tags = {
        Environment = "staging"
        Application = "gromits"
    }
}