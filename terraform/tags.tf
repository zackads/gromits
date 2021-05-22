module "gromits_webapp_label" {
  source = "cloudposse/label/terraform"
  version = "0.8.0"
  namespace = "gromits"
  stage = "dev"
  name = "webapp"
}