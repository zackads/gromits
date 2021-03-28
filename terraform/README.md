TODO: Use the Turner Labs ECS repo notes and the MCA's integration repo to set up infra:

- 1 x service with 1 x task definition for the POI service
- 1 x service with 1 x task definition for the web app
- Both existing within the same cluster

Check out how the ALB in the Beacons app listens on the frontend load balancer and forwards all traffic for a certain port to the service: https://github.com/mcagov/beacons-integration/blob/main/terraform/alb.tf

https://github.com/turnerlabs/terraform-ecs-fargate

GitHub Actions should

- Build and push both containers to ECR
- `terraform apply`, with an input variable of the commit SHA so that the ECS cluster can deploy with the new images

I also need to seed the Mongo Atlas managed DB with listed buildings data. I can do this with the `mongo-seed` docker image.
