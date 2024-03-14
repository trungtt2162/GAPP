
INSERT INTO user_role ( RoleCode, RoleName, UserID)
SELECT 
       r.RoleCode,
       r.RoleName,
       @UserID
       FROM role r
WHERE r.RoleCode = @RoleCode;