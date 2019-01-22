pipeline {
    agent any
    
    environment {
        DB_HOST = 'tyc-staging-db.ccyhbb1rxdyk.ap-south-1.rds.amazonaws.com'
        DB_USERNAME = credentials('db.staging.username')
        DB_PWD = credentials('db.staging.password')
        DB_NAME = 'tyc'
    }
    stages {
        stage('checkout source') {
            steps {
                git 'https://github.com/ThankUCookies/tyc-backend'
            }
        }
        stage('install dependencies') {
            steps {
                nodejs('v8') {
                    sh 'yarn install'
                }
            }
        }
        stage('run tests') {
            steps {
                nodejs('v8') {
                    sh 'npm run test:ci'
                }
            }
            post {
                always {
                    junit '__test__/test-results.xml'
                }
            }
        }
        stage('archive coverage report') {
            steps {
                nodejs('v8') {
                    sh 'npm run coverage'
                    cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'coverage/cobertura-coverage.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
                }
            }
        }
        stage('build the application') {
            steps {
                nodejs('v8') {
                    sh 'npm run build:prod'
                }
            }
        }
        stage('archive the artifacts') {
           steps {
                fileOperations([fileCopyOperation(excludes: '', flattenFiles: false, includes: 'package.json', targetLocation: 'dist')])
                fileOperations([fileZipOperation('dist')])
                archiveArtifacts 'dist.zip'
           }
        }
        stage('apply db migrations') {
           steps {
                nodejs('v8') {
                    sh 'npm run db-migrate:up'                    
                }
           }
        }
        stage('publish to aws elastic beanstalk') {
            steps {
                step([$class: 'AWSEBDeploymentBuilder', applicationName: 'tyc-web-api', awsRegion: 'ap-south-1', bucketName: 'tyc-web-api-bucket', checkHealth: true, credentialId: 'aws.tyc', environmentName: 'tyc-staging-env', excludes: '', includes: '', keyPrefix: '', maxAttempts: 30, rootObject: 'dist', sleepTime: 90, versionDescriptionFormat: 'Release from build ${BUILD_ID}', versionLabelFormat: '${BUILD_ID}', zeroDowntime: false])
            }
        }
    }
}