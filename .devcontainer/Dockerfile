ARG VARIANT=jammy
ARG VERSION=8.0
FROM mcr.microsoft.com/devcontainers/dotnet:${VERSION}-${VARIANT}

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get install -y xdg-utils \
    && curl -fsSL https://aka.ms/install-azd.sh | bash \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*