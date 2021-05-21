variable "name" {
  type = string
  description = "The name of the app or service being deployed"
}

variable "aws_region" {
  type = string
  description = "The AWS region in which to create resources"
}

variable "domain" {
  type = string
  description = "The domain name at which the website is served"
}