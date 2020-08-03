package com.xiao.blog.service;

import com.xiao.blog.model.Permission;
import com.xiao.blog.pojo.TreeModel;

import java.util.List;

/**
 * @author wangmx
 * @create 2019-11-15 21:38
 * @Desc
 */
public interface PermissionService {

    List<Permission> getPermissionsByRole(int roleId);

    List<Permission> getAll();

    List<Permission> getPermissionsByParent(Integer parentId);

    int insert(Permission permission);

    int delete(Integer id);

    int update(Permission permission);

    List<TreeModel> getPermissionTree(Integer roleId);

    List<Permission> getMenu(Integer id);
}
