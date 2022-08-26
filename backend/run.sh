#!/usr/bin/env bash

usage() {
    echo "Usage: run.sh [-adhlm]" >&2
    echo "  -a   run all commands" >&2
    echo "  -d   dump app 'core' to fixtures" >&2
    echo "  -l   load app 'core' from fixtures" >&2
    echo "  -m   make migrations and migrate" >&2
    echo "  -h   display help" >&2
}

dumpdata() {
    echo "dumping app 'core' to fixtures"
    python manage.py dumpdata --indent=4 core >core/fixtures/initial_data.json
}

loaddata() {
    echo "loading app 'core' from fixtures"
    python manage.py loaddata core/fixtures/initial_data.json --app core
}

makemigrations() {
    echo "making migrations"
    python manage.py makemigrations --noinput
}

migrate() {
    echo "migrating"
    python manage.py migrate
}

while getopts "adlmh" opt; do
    case $opt in
    a)
        echo "running all commands"
        dumpdata
        loaddata
        makemigrations
        migrate
        ;;
    d)
        dumpdata
        ;;
    l)
        loaddata
        ;;
    m)
        makemigrations
        migrate
        ;;
    h)
        usage
        ;;
    \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
    esac
done

echo "running development server"
python manage.py runserver
