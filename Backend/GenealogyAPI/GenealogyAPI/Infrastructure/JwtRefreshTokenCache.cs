namespace GenealogyAPI.Infrastructure
{
    public class JwtRefreshTokenCache : IHostedService, IDisposable
    {
        private readonly IJwtAuthManager _jwtAuthManager;
        public JwtRefreshTokenCache(IJwtAuthManager jwtAuthManager)
        {
            _jwtAuthManager = jwtAuthManager;
        }

        private Timer _timer = null!;

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork!, null, TimeSpan.Zero, TimeSpan.FromMinutes(24 * 60));
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _jwtAuthManager.RemoveExpiredRefreshTokens(DateTime.Now);
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _timer.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
