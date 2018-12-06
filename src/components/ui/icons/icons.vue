<template lang="pug">
mixin menu-icons(name, href)
    a.-menu-icon(class=name + '-icon', href='/')
      .-icon-name._flex_v_h
        p #{name.toUpperCase()}
      if block
        block
</template>

