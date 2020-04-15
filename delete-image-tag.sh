tag="${1}"
existing_tags=$(gcloud container images list-tags --filter="tags:${tag}" --format=json gcr.io/fulfil-web/fulfil-api)

if [[ "$existing_tags" == "[]" ]]; then
  echo "---- tag does not exist ----"

else
  echo "---- tag exists ---- "

  gcloud container images delete gcr.io/fulfil-web/fulfil-api:${tag} --force-delete-tags  --quiet
fi
