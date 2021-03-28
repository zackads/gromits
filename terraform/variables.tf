variable "aws_region" {
    type = string
    description = "The AWS region in which to create resources"
}

variable "env" {
    type = string
    description = "The environment that is being deployed"
}

variable "webapp_fargate_cpu" {
    type = number
    description = "Webapp Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
}

variable "webapp_fargate_memory" {
    type = number
    description = "Webapp Fargate instance memory to provision (in MiB)"
}

variable "webapp_image_tag" {
    type = string
    description = "Tag of the Webapp image"
}

variable "webapp_count" {
    type = number
    description = "Number of ECS Tasks to run for the Webapp"
}