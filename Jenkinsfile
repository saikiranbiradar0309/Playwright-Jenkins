pipeline {
    agent any

    environment {
        NODE_HOME = '/Users/saikiranbiradar/.nvm/versions/node/v24.16.0/bin'
        PATH = "/Users/saikiranbiradar/.nvm/versions/node/v24.16.0/bin:${PATH}"
    }

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

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Installing dependencies"
                    npm ci
                '''
            }
        }

        stage('Install Playwright Browser') {
            steps {
                sh '''
                    echo "Installing Playwright Chromium"
                    npx playwright install chromium
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    echo "Running Playwright tests"
                    npx playwright test --project=chromium
                '''
            }
        }
    }


    post {
        always {
            junit (
                testResults: 'test-results/junit.xml',
                allowEmptyResults: true
            )

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )
        }
    }
}