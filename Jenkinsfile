pipeline {
    agent any

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
                '''
            }
        }
    }
}