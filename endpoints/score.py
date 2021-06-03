from silence.decorators import endpoint

@endpoint(
    route="/score",
    method="GET",
    sql="SELECT * FROM score"
)
def get_all():
    pass
