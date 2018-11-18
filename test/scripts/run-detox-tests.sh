#!/usr/bin/env bash

# start the backend
cd ../mono
nohup ./mvnw &

# wait for the backend to start
# see https://github.com/jhipster/generator-jhipster/blob/2a803eca36f21079320c602645e13c177f6c6ea9/test-integration/scripts/24-tests-e2e.sh
retryCount=1
maxRetry=10
httpUrl="http://localhost:8080"

rep=$(curl -v "$httpUrl")
status=$?
while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
    echo "*** [$(date)] Application not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
    retryCount=$((retryCount+1))
    sleep 10
    rep=$(curl -v "$httpUrl")
    status=$?
done

if [ "$status" -ne 0 ]; then
    echo "*** [$(date)] Not connected after" $retryCount " retries."
    return 1
fi

sleep 60

cd ../JwtApp
# run the detox tests
detox test --configuration ios.sim.release
