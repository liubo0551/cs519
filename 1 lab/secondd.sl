displacement
secondd(
	float	Width = 0.10,				// square width
		Ramp = 0.20,				// fraction of square used in the ramp
		Height = 0.2;				// displacement height
)
{
	float TheHeight = 0.;			// how much displacement to apply

	float up = 2. * u;
	float vp = v;
	float numinu = floor( up / Width );
	float numinv = floor( vp / Width );
	
	if( mod( numinu+numinv, 2. ) == 0. )
	{
		float umin = numinu*Width;	// square boundaries in u
		float umax = umin+Width;
		float vmin = numinv*Width;	// square boundaries in v
		float vmax = vmin+Width;
		float distu = min( up-umin, umax-up );	// dist to nearest u boundary
		float distv = min( vp-vmin, vmax-vp );	// dist to nearest v boundary
		float dist = min( distu, distv )/Width;	// dist to nearest boundary
		float t = smoothstep( 0., Ramp, dist );	// 0. if dist <= 0., 1. if dist >= Ramp
		TheHeight = t*Height;			// apply the blending
	}


#define DISPLACEMENT_MAPPING

	
	if( TheHeight != 0. )
	{
#ifdef DISPLACEMENT_MAPPING
		P = P + normalize(N) * TheHeight;
		N = calculatenormal(P);
#else
		N = calculatenormal( P + normalize(N) * TheHeight );
#endif
	}
}
