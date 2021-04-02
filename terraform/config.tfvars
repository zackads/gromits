name = "gromits"
env  = "staging"

aws_region = "eu-west-2"
az_count   = 2

container_registry = "public.ecr.aws/t1m1t5z8"

webapp_container_repo = "gromits-webapp"
webapp_fargate_cpu    = 256
webapp_fargate_memory = 512
webapp_port           = 80
webapp_count          = 1

poi_db_url  = poi-db.iajr9.mongodb.net
poi_db_name = poi