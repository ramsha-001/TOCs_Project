pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    userRemoteConfigs: [[
                        url: 'https://github.com/ramsha-001/TOCs_Project.git'
                    ]]
                ])
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                // No build step required for HTML/CSS/JS
            }
        }
        
        stage('Deploy') {
            steps {
                sshagent(['Apache']) {
                    sh '''
                    # Transfer files to the Apache2 server
                    scp -o StrictHostKeyChecking=no -r * ubuntu@16.171.232.2:/var/www/html/
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
