
INSERT INTO user_role ( RoleCode, RoleName, UserID, IdGenealogy)
SELECT 
       r.RoleCode,
       r.RoleName,
       @UserID,
       @IdGenealogy
       FROM role r
WHERE r.RoleCode = @RoleCode;