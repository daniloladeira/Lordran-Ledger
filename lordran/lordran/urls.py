from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from artorias import views
from artorias.auth_views import CustomTokenObtainPairView, register_user, get_user_profile, update_user_profile
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation with Swagger",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'weapons', views.WeaponViewSet)
router.register(r'spells', views.SpellViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('artorias_api/', include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register_user, name='register_user'),
    path('api/profile/', get_user_profile, name='get_user_profile'),
    path('api/profile/update/', update_user_profile, name='update_user_profile'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
