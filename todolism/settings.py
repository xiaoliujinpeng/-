
import os.path
basedir=os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

class DevelopmentConfig():
    DAYS_PER_PAGE=7
    SQLALCHEMY_DATABASE_URI=os.getenv("DATABASE_URL","sqlite:///"+os.path.join(basedir,'data.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig():
    pass


config={
    "development":DevelopmentConfig,
    "production":ProductionConfig
}