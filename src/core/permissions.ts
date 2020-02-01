
export enum Permission {
  superadmin = 'superadmin',
  league = 'league',
  division = 'division',
  common = 'common'
}

function hasPermission(accessingTo: Permission, permission: Permission): boolean {
  const permissionToValue: { [key in Permission]: number } = {
    superadmin: 100,
    league: 90,
    division: 30,
    common: 20
  };

  return permissionToValue[permission] >= permissionToValue[accessingTo]
}

export const checkPerms = (accessingTo: Permission) => {
  return async (req, res, next) => {
    const hasPerms = hasPermission(accessingTo, res.locals.permissions);
    if (hasPerms) {
      next();
    } else {
      res.status(403).json({
        status: false,
        errorCode: 'INVALID_PERMS',
        msg: 'User does not have sufficient permissions',
      });
    }
  };
};
