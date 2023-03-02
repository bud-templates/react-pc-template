env=$1
if [[ -z $env ]];then
  echo "invalid env"
  exit 1;
fi
if [[ "$env" != "master" ]] && [[ "$env" != "alpha" ]] && [[ "$env" != "prod" ]];then
  echo "invalid env"
  exit 1;
fi
path=''
distributionId=''
invalidationPath=''
if [[ "$env" == "master" ]] || [[ "$env" == "alpha" ]];then
  path="buddy-app-bucket/bud-web3tool/$env/"
  distributionId="E7LX0XRPGKR06"
  invalidationPath="/bud-web3tool/$env/*"
else
  path='bud-web3tool/production/'
  distributionId="E3DAEXA6VUMRB5"
  invalidationPath="/*"
fi
echo $path,$distributionId,$invalidationPath

node scripts/build.js $env

aws s3 cp ./build s3://$path --recursive

aws cloudfront create-invalidation \
    --distribution-id "$distributionId" \
    --paths "$invalidationPath"
