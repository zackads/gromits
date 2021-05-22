resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    origin_id = var.domain
    domain_name = aws_s3_bucket.prod.bucket_regional_domain_name
  }

  aliases = [
    var.domain]

  enabled = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS"]
    cached_methods = [
      "GET",
      "HEAD"]
    target_origin_id = var.domain

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations = [
        "GB"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}