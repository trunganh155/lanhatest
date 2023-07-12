import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SceneInit from "../../lib/SceneInit";
import "./Design.css";

export default function Design() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");

    test.initialize();
    // Thêm trục tọa độ
    const axesHelper = new THREE.AxesHelper(500);
    test.scene.add(axesHelper);
    // axesHelper.position.set(0, -50, 0);

    test.animate();

    const texture1 = new THREE.TextureLoader().load(
      "./assets/shiba/modul1glb_img0.png"
    );
    const texture2 = new THREE.TextureLoader().load(
      "./assets/shiba/textures/wood_texture.png"
    );
    const texture3 = new THREE.TextureLoader().load(
      "./assets/shiba/textures/vango.png"
    );
    const texture4 = new THREE.TextureLoader().load(
      "./assets/shiba/textures/san-nha2.png"
    );

    const glftLoader = new GLTFLoader();

    // START Xử lí click vào 1 module
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let clickedObject = null;

    const hendleFocusModule = () => {
      let clickedGroup = null;
      let parent = clickedObject.parent;
      while (parent) {
        if (parent instanceof THREE.Group) {
          clickedGroup = parent;
          break;
        }
        parent = parent.parent;
      }

      if (clickedGroup) {
        clickedGroup.traverse((node) => {
          // if (node.isMesh) {
          //   // Áp dụng các thay đổi cho các thành phần mesh trong group
          //   // Ví dụ: thay đổi vật liệu
          //   node.material = new THREE.MeshBasicMaterial({ color: "#ccc" });
          // }

          if (node.isMesh) {
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              material.map = texture3;
            });
          }
        });
      }
    };

    const handleMouseDown = (event) => {
      // Chuyển đổi tọa độ chuột sang không gian Three.js
      mouse.x = (event.clientX / (0.7 * window.innerWidth)) * 2 - 1;
      mouse.y = -(event.clientY / (0.8 * window.innerHeight)) * 2 + 1;

      // Tìm kiếm các khối va chạm với tia từ vị trí chuột
      raycaster.setFromCamera(mouse, test.camera);
      const intersects = raycaster.intersectObjects(test.scene.children, true);

      if (intersects.length > 0) {
        // Lưu trữ đối tượng được nhấp vào
        clickedObject = intersects[0].object;

        hendleFocusModule();

        // In ra thông tin về đối tượng được nhấp vào
        console.log("Đã nhấp chuột vào:", clickedObject.name);
      }
    };

    const canvas = document.getElementById("myThreeJsCanvas");
    canvas.addEventListener("mousedown", handleMouseDown, false);

    const handleMouseUp = () => {
      clickedObject = null;
    };
    window.addEventListener("mouseup", handleMouseUp, false);
    // END Xử lí click vào 1 module

    glftLoader.load("./assets/shiba/modul3group.gltf", (gltfScene) => {
      // gltfScene.scene.traverse((node) => {
      //   if (node.isMesh) {
      //     const materials = Array.isArray(node.material)
      //       ? node.material
      //       : [node.material];
      //     materials.forEach((material) => {
      //       material.map = texture3;
      //     });
      //   }
      // });

      gltfScene.scene.position.set(10, 0, 30);
      gltfScene.scene.scale.set(20, 20, 20);
      test.scene.add(gltfScene.scene);
    });

    glftLoader.load("./assets/shiba/modul2group.gltf", (gltfScene) => {
      gltfScene.scene.traverse((node) => {
        if (node.isMesh) {
          const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];
          materials.forEach((material) => {
            material.map = texture3;
          });
        }
      });

      gltfScene.scene.position.set(40, 0, 30);
      gltfScene.scene.scale.set(20, 20, 20);
      test.scene.add(gltfScene.scene);
    });

    // Tạo vật liệu với hình ảnh làm background
    const textureXZ = new THREE.TextureLoader().load(
      "./assets/shiba/textures/san-nha.png"
    );
    const materialXZ = new THREE.MeshBasicMaterial({
      map: textureXZ,
      side: THREE.DoubleSide,
    });
    // Tạo mặt phẳng XZ và gán vật liệu backgroundXZ
    const size = 350;
    const planeXZGeometry = new THREE.PlaneGeometry(size, size);
    const planeXZ = new THREE.Mesh(planeXZGeometry, materialXZ);
    planeXZ.rotation.x = Math.PI * -0.5; // Xoay mặt phẳng theo trục X để hiện đúng hướng
    planeXZ.position.x = size / 2;
    planeXZ.position.z = size / 2;
    test.scene.add(planeXZ);

    // Tạo vật liệu với hình ảnh làm backgroundYZ
    const textureYZ = new THREE.TextureLoader().load(
      "./assets/shiba/textures/san-nha2.png"
    );
    const materialYZ = new THREE.MeshBasicMaterial({
      map: textureYZ,
      side: THREE.DoubleSide,
    });
    // Tạo mặt phẳng YZ và gán vật liệu background
    const planeYZGeometry = new THREE.PlaneGeometry(size, size);
    const planeYZ = new THREE.Mesh(planeYZGeometry, materialYZ);
    planeYZ.rotation.y = Math.PI * -0.5; // Xoay mặt phẳng theo trục X để hiện đúng hướng
    planeYZ.position.y = size / 2;
    planeYZ.position.z = size / 2;
    test.scene.add(planeYZ);

    // Tạo vật liệu với hình ảnh làm backgroundXY
    const textureXY = new THREE.TextureLoader().load(
      "./assets/shiba/textures/san-nha2.png"
    );
    const materialXY = new THREE.MeshBasicMaterial({
      map: textureXY,
      side: THREE.DoubleSide,
    });
    // Tạo mặt phẳng XY và gán vật liệu background
    const planeXYGeometry = new THREE.PlaneGeometry(size, size);
    const planeXY = new THREE.Mesh(planeXYGeometry, materialXY);
    planeXY.rotation.z = Math.PI * -1; // Xoay mặt phẳng theo trục X để hiện đúng hướng
    planeXY.position.x = size / 2;
    planeXY.position.y = size / 2;
    test.scene.add(planeXY);
  }, []);

  return (
    <div id="container__canvas">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
