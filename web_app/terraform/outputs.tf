output "s3_bucket_name" {
  value = aws_s3_bucket.prod.id
}

output "s3_website_address" {
  value = aws_s3_bucket.prod.website_endpoint
}