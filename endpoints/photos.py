from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM photos"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM photos WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO photos (title, description, url, visibility, userId) VALUES ($title, $description, $url, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, url, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE photos SET title = $title, description = $description, url = $url, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, url, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass
