#!/bin/bash

export JAVA_HOME=/usr/lib/jvm/default-java
export HADOOP_HOME=/home/hduser/hadoop
export PATH=/usr/bin:/usr/sbin:/bin:/sbin:/usr/local/bin:/usr/local/sbin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

cd /home/hduser/scripts/weather-cams

export OUTPUT_TIME=`date -u +"%Y%m%d_%H%M%S"`
export CAMERA_DIRECTORY="./cameras/output/${OUTPUT_TIME}_camera-images"

hdfs dfs -D dfs.block.size=5242880 -copyFromLocal camera-database.json cameras/camera-database.json

hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-3.0.0-alpha1.jar \
       -D dfs.block.size=5242880 \
       -files ./mapper.js,./reducer.js,./node_modules,./md5.js \
       -mapper "node ./mapper.js" \
       -reducer "node ./reducer.js" \
       -input "./cameras/camera-database.json" \
       -output $CAMERA_DIRECTORY