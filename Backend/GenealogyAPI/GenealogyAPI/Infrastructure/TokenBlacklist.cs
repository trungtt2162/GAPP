namespace GenealogyAPI.Infrastructure
{
    public class TokenBlacklist
    {
        private readonly HashSet<string> _blacklistedTokens = new HashSet<string>();

        public void AddToken(string token)
        {
            lock (_blacklistedTokens)
            {
                _blacklistedTokens.Add(token);
            }
        }

        public bool Contains(string token)
        {
            lock (_blacklistedTokens)
            {
                return _blacklistedTokens.Contains(token);
            }
        }

        public void RemoveToken(string token)
        {
            lock (_blacklistedTokens)
            {
                _blacklistedTokens.Remove(token);
            }
        }
    }
}
