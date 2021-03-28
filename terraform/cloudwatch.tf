resource "aws_cloudwatch_log_group" "gromits" {
    name = "awslogs-gromits-staging"

    tags = {
        Environment = "staging"
        Application = "gromits"
    }
}