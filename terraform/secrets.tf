resource "aws_secretsmanager_secret" "poi_db_password" {
  name = "poi_db_password"
}

resource "aws_secretsmanager_secret_version" "poi_db_password" {
  secret_id     = aws_secretsmanager_secret.poi_db_password.id
  secret_string = var.poi_db_password
}