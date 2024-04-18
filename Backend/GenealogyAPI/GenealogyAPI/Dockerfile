FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["GenealogyAPI/GenealogyAPI.csproj", "GenealogyAPI/"]
COPY ["GenealogyBL/GenealogyBL.csproj", "GenealogyBL/"]
COPY ["GenealogyCommon/GenealogyCommon.csproj", "GenealogyCommon/"]
COPY ["GenealogyDL/GenealogyDL.csproj", "GenealogyDL/"]
RUN dotnet restore "GenealogyAPI/GenealogyAPI.csproj"
COPY . .
WORKDIR "/src/GenealogyAPI"
RUN dotnet build "GenealogyAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GenealogyAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GenealogyAPI.dll"]