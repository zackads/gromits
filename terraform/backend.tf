terraform {
  backend "s3" {
    bucket = "zackads-terraform-state"
    dynamodb_table = "zackads-terraform-state"
    encrypt = true
    key = "gromits/web_app/state.tfstate"
    region = "eu-west-2"
  }
}