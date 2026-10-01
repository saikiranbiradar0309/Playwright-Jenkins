pipeline {
    agent any
    /*
    environment {
        PATH_NODE = '/Users/saikiranbiradar/.nvm/versions/node/v24.16.0/bin'
    }
    */

    stages{
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check nodejs is installed') {
            steps {
                sh '''
                    echo "Checking Nodejs Version"
                    node -v

                    echo "Checking npm version"
                    npm -v

                    echo "Node.js location"
                    which node

                    echo "NPM location"
                    which npm

                    echo "Current workspace"
                    pwd
                '''
            }
        }
    }
}