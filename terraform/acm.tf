resource "aws_acm_certificate" "default" {
  provider = aws.acm
  domain_name = var.domain
  validation_method = "DNS"
  subject_alternative_names = [
    "*.${var.domain}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "default" {
  provider = aws.acm
  certificate_arn = aws_acm_certificate.default.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}