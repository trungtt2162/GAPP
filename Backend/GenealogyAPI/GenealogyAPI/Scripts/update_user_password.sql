UPDATE user_password 
set Password = @Password,ModifiedDate = NOW(),ModifiedBy = @ModifiedBy
WHERE
  UserName = @UserName
;
