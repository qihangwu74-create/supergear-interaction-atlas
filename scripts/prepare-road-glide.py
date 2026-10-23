import bpy, os, json, time
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT,'model-work','Harley-Davidson_Road_Glide_2024.glb'))
before=sum(len(o.data.polygons) for o in bpy.data.objects if o.type=='MESH')
for obj in bpy.data.objects:
    if obj.type!='MESH': continue
    if len(obj.data.polygons)>3500:
        mod=obj.modifiers.new('Web_detail_budget','DECIMATE');mod.ratio=0.42
        bpy.context.view_layer.objects.active=obj
        bpy.ops.object.modifier_apply(modifier=mod.name)
after=sum(len(o.data.polygons) for o in bpy.data.objects if o.type=='MESH')
out=os.path.join(ROOT,'dist','road-glide','assets');os.makedirs(out,exist_ok=True)
target=os.path.join(out,'road-glide-2024.glb')
bpy.ops.export_scene.gltf(filepath=target,export_format='GLB',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=7,export_draco_position_quantization=14,export_draco_normal_quantization=10,export_draco_texcoord_quantization=12)
report={'sourceBytes':31945256,'sourceTriangles':before,'webTriangles':after,'webBytes':os.path.getsize(target),'meshObjects':len([o for o in bpy.data.objects if o.type=='MESH']),'method':'Decimate 0.42 only on meshes above 3500 faces; Draco level 7; positions 14 bit; retained material slots and embedded textures','date':'2026-10-23'}
with open(os.path.join(out,'model-report.json'),'w') as f:json.dump(report,f,indent=2)
print('ROAD_GLIDE_REPORT',json.dumps(report))
