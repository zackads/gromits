resource "aws_s3_bucket" "prod" {
  bucket = var.domain
  acl = "public-read"

  cors_rule {
    allowed_headers = [
      "*"]
    allowed_methods = [
      "PUT",
      "POST"]
    allowed_origins = [
      "*"]
    expose_headers = [
      "ETag"]
    max_age_seconds = 3000
  }

  policy = <<EOF
    {
        "Version": "2008-10-17",
        "Statement": [
        {
            "Sid": "PublicReadForGetBucketObjects",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
             },
             "Action": "s3:GetObject",
             "Resource": "arn:aws:s3:::${var.domain}/*"
        }]
    }
  EOF

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}