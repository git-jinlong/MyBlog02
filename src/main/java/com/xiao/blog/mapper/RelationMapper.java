package com.xiao.blog.mapper;

import com.xiao.blog.model.Role;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wangmx
 * @create 2019-11-17 16:06
 * @Desc
 */
@Mapper
public interface RelationMapper {

    @Delete("delete from sys_role_permission where permission_id = #{id}")
    public void deleteRelationByPermissionId(Integer id);

    @Select("select role_id from sys_user_role where user_id = #{id}")
    public Integer getRoleByUser(Integer id);

    @Select("select role.* from sys_role_permission srp left join sys_role role on srp.role_id = role.id where srp.permission_id = #{id}")
    public List<Role> getRolesByPermission(Integer id);
}
