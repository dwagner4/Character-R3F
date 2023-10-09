import { useThree } from "@react-three/fiber";
import { useEffect, Vector3 } from "react";

export function FollowCamera( props )
{
  const {camx} = props
  const {camera} = useThree();
  

  useEffect(() => {
    if (camera) {
      camera.position.set(camx, 2, 10);
      camera.lookAt(0,0,0)
    }
  }, [camx])

  return (<></> )
}