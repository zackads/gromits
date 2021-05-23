provider "aws" {
  region = "eu-west-2"
}

provider "aws" {
  alias = "us-east-1"
  region = "us-east-1"
}