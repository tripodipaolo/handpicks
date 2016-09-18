CarrierWave.configure do |config|
  case Rails.env
  when 'production'
    config.storage = :fog
    config.fog_directory  = 'handpicks-prod'
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     'AKIAJWXQ7BJ3T35G5HRQ',
      aws_secret_access_key: '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',
      region:                'eu-west-1'
    }
  else
    config.storage = :file
    config.asset_host = "http://localhost:3000"
  end
  config.root = Rails.root
end